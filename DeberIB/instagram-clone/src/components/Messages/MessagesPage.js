import { Link, Route, Routes } from "react-router-dom";
import SendMessageBox from "./SendMessageBox";

function MessagesPage() {
    return (
        <div>
            <Routes>
                <Route path="/new/" element={<SendMessageBox />} />
            </Routes>
            <div className="message-page-container">
                <div className="message-page-main-area">
                    <div className="message-page-left-area">
                        <div className="message-page-left-area-upper">
                            <div style={{ margin: "auto" }}>yavuzyigitmuhammetali</div>
                            <Link style={{ position: "absolute", right: "5%", top: "30%" }}
                                to="http://localhost:3000/direct/new/">
                                <svg className="_ab6-" color="rgb(38, 38, 38)"
                                    fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"></path>
                                    <path
                                        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"></path>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924"
                                        y2="7.153"></line>
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MessagesPage;