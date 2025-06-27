import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getLogs} from "../../widgets/admin-logs-widget/model/effects";
import './Logs.css';

export const highlightLog = (log: string) => {
    const timestampRegex = /^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/;
    const timestamp = log.match(timestampRegex)?.[0] || "";

    const rest = log.replace(timestamp, "")

    return (
        <div className="log-entry">
            <p><span className="log-timestamp">{timestamp}</span>{rest}</p>
        </div>
    );
};

const Logs: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const stores = useSelector(userStoresSelect.stores);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getLogs(stores[0].id, accessToken, dispatch).then((logs) => setLogs(logs));
    }, [accessToken, stores]);
    
    const tabs = stores.map((store) => {
        return {id: store.id, label: store.name}
    });
    const [activeTab, setActiveTab] = useState(stores[0].id);

    const handleChangeStore = async (id: string) => {
        setActiveTab(id);
        getLogs(id, accessToken, dispatch).then((logs) => setLogs(logs));
    }
    
    return (
        <div className="logs">
            <div className="logs-container">
                <div className='logs-header'>
                    <h1>Logs</h1>
                </div>
                <div className="logs-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleChangeStore(tab.id)}
                            className={`logs-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {stores.length === 0 && (
                    <div className="logs-empty-container">
                        <h2>Your store has no orders yet</h2>
                        <p>Once customers place orders, they’ll appear here for you to manage and fulfill.</p>
                    </div>
                )}
                <div className="logs-logs-container">
                    {logs.map((log) => (
                        <>
                            {highlightLog(log)}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Logs;