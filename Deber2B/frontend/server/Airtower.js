/* eslint-disable no-unused-expressions */
class Airtower {
    constructor(core) {
        this.core = core;
        this.ws = null;
        this.isConnected = false;
        this.wsUrl = 'ws://172.30.153.216:4001';
        this.lastSent = 0;
        this.resolveConnection;
    }

    connect(serverId) {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.wsUrl);
            this.ws.binaryType = 'arraybuffer';

            this.ws.onopen = this.handleOpen.bind(this);
            this.ws.onclose = this.handleClose.bind(this);
            this.ws.onerror = this.handleError.bind(this);
            this.ws.onmessage = this.handleMessage.bind(this);

            this.resolveConnection = resolve;
        });
    }

    handleOpen() {
        this.isConnected = true;
        this.sendData('initializePlayer', {
            username: this.core.login.nameInput.text,
            password: this.core.login.passwordInput.text
        });
    }


    handleClose(event) {
        const message = this.isConnected ? 'Se ha perdido la conexión con el servidor. Error ' : 'No se ha podido establecer la conexión con el servidor. Error ';

        this.isConnected = false;

        this.core.prompts.showSimplePrompt('warn', message + event.code, () => {
            window.location.reload();
        });
    }

    handleError(event) {
        console.error('Error inesperado en la conexión ', event);
    }

    handleMessage(event) {
        const data = JSON.parse(event.data);
        const handlerMap = {
            'handledData': this.handleGetData.bind(this),
            'authError': this.handleAuthError.bind(this),
            'playerMoved': this.handlePlayerMove.bind(this),
            'playerTeleported': this.handlePlayerTeleport.bind(this),
            'handledJoinRoom': this.handleJoinRoom.bind(this),
            'newPlayer': this.handleAddPlayer.bind(this),
            'playerDisconnected': this.handleLeaveRoom.bind(this),
            'playerMessaged': this.handlePlayerMessage.bind(this),
            'snapshot': this.handleUpdatePlayersSnapshot.bind(this),
            'playerActioned': this.handlePlayerAction.bind(this),
            'updatedItem': this.handleUpdatePlayerItem.bind(this),
            'removedItem': this.handleRemovePlayerItem.bind(this),
            'updatedColor': this.handleUpdatePlayerColor.bind(this),
            'textingBubbleSent': this.handleTextingBubble.bind(this),
            'snowballThrew': this.handleThrowSnowball.bind(this),
        };

        if (handlerMap[data.event]) {
            handlerMap[data.event](data);
        }
    }

    sendData(event, data) {
        const payload = { event, data };
        this.ws.send(JSON.stringify(payload));
    }

    async handleAuthError({ reason }) {
        if (reason === 'incorrectpassword') {
            this.showLoginErrorPrompt('Contraseña incorrecta');
        } else if (reason === 'notfound') {
            this.showLoginErrorPrompt('Usuario no encontrado');
        } else {
            this.showLoginErrorPrompt('Ha habido un problema en la autenticación');
        }
    }

    showLoginErrorPrompt(text) {
        this.core.prompts.showSimplePrompt('warn', text, () => {
            this.core.loadManager.loaderScene.showLoadScreen(false),
                this.core.login.showScene(),
                this.core.prompts.closePrompt();
        });
    }

    async handleGetData({ player }) {
        this.resolveConnection(true);
        const { client, ...playerData } = player;
        this.core.myPlayer = playerData;
    }

    async sendPlayerMove(x, y) {
        this.sendData('playerMove', {
            id: this.core.getMyPlayerId(),
            x: x,
            y: y
        });
    }

    async handlePlayerMove({ id, x, y }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[id];
            if (playerObj !== undefined) {
                playerObj.move(x, y);
            }
        }
    }

    async sendPlayerTeleport(x, y) {
        this.sendData('playerTeleport', {
            id: this.core.getMyPlayerId(),
            x: x,
            y: y
        });
    }

    async handlePlayerTeleport({ id, x, y }) {
        if (this.core.currentRoom) {
            this.core.currentRoom.teleportPlayer(id, x, y);
        }
    }

    async sendJoinRoom(roomId, x, y) {
        this.sendData('joinRoom', {
            roomId: roomId,
            x: x,
            y: y,
        });
    }

    async handleJoinRoom({ players, roomId }) {
        this.core.joinRoom(roomId, players);
    }

    async handleAddPlayer({ player }) {
        if (this.core.currentRoom) {
            if (player.id !== this.core.getMyPlayerId()) {
                this.core.currentRoom.addPlayer(player);
            }
        }
    }

    async handleLeaveRoom({ id }) {
        if (this.core.currentRoom) {
            this.core.currentRoom.removePlayer(id);
        }
    }

    async sendPlayerAction(actionId) {
        const now = Date.now();

        if (now - this.lastSent >= 1000) {
            this.lastSent = now;

            this.sendData('playerAction', {
                id: this.core.getMyPlayerId(),
                actionId: actionId,
            });

            if (actionId !== 32) {
                this.core.myPlayer.animation = actionId;
            }
        }
    }

    async handlePlayerAction({ id, actionId }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[id];
            if (playerObj !== undefined) {
                playerObj.updateAnimation(actionId);
            }
        }
    }

    async sendGetPlayersSnapshot() {
        this.sendData('getSnapshot', {});
    }

    async handleUpdatePlayersSnapshot({ players }) {
        if (this.core.currentRoom) {
            this.core.currentRoom.updatePlayersSnapshot(players);
        }
    }

    async sendPlayerMessage(message) {
        this.sendData('playerMessage', {
            id: this.core.getMyPlayerId(),
            message: message,
        });
    }

    async handlePlayerMessage({ id, message }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[id];
            if (playerObj !== undefined) {
                playerObj.sendMessage(message);
            }
        }
    }

    async sendTextingBubble(status) {
        this.sendData('playerTextingBubble', {
            playerId: this.core.getMyPlayerId(),
            bubbleStatus: status,
        });
    }

    async handleTextingBubble({ playerId, bubbleStatus }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[playerId];
            if (playerObj !== undefined) {
                playerObj.isTyping = bubbleStatus;
                playerObj.sendTextingBubble(bubbleStatus);
            }
        }
    }

    async updatePlayerItem(itemId) {
        const typeId = this.core.getItemTypeById(itemId);
        this.core.myPlayer.clothes[typeId] = itemId;
        this.sendData('updateItem', {
            playerId: this.core.getMyPlayerId(),
            itemId: itemId,
            typeId: typeId,
        });
    }

    async removePlayerItem(itemType) {
        this.core.myPlayer.clothes[itemType] = null;
        this.sendData('removeItem', {
            playerId: this.core.getMyPlayerId(),
            itemType: itemType,
        });
    }

    async handleUpdatePlayerItem({ playerId, itemId, typeId }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[playerId];
            if (playerObj !== undefined) {
                playerObj.characterData.clothes[typeId] = itemId;
                playerObj.setItem(itemId, typeId)

                this.handleUpdateProfile(playerId);
            }
        }
    }

    async handleRemovePlayerItem({ playerId, itemType }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[playerId];
            if (playerObj !== undefined) {
                playerObj.characterData.clothes[itemType] = null;
                playerObj.setItem(null, itemType)

                this.handleUpdateProfile(playerId);
            }
        }
    }

    async updatePlayerColor(colorId) {
        this.core.myPlayer.clothes.color = colorId;
        this.sendData('updateColor', {
            playerId: this.core.getMyPlayerId(),
            colorId: colorId,
        });
    }

    async handleUpdatePlayerColor({ playerId, colorId }) {
        if (this.core.currentRoom) {
            const playerObj = this.core.currentRoom.playerList[playerId];
            if (playerObj !== undefined) {
                playerObj.setColor(colorId)

                this.handleUpdateProfile(playerId);
            }
        }
    }

    handleUpdateProfile(playerId) {
        const profile = this.core.ui.playerProfile;

        if (profile.currentPlayerId === playerId) {
            profile.updateProfile(playerId);
        }
    }

    // Snowballs

    async sendThrowSnowball(x, y) {
        const now = Date.now();

        if (now - this.lastSent >= 1000) {
            this.lastSent = now;

            this.sendData('throwSnowball', {
                playerId: this.core.getMyPlayerId(),
                snowballX: x,
                snowballY: y,
            });
        }
    }

    async handleThrowSnowball({ playerId, snowballX, snowballY }) {
        if (this.core.currentRoom) {
            this.core.currentRoom.throwSnowball(playerId, snowballX, snowballY);
        }
    }
}
