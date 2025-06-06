import {AUTH_BASE_URL, COOKIE_KEY} from "./constants";
import {request} from "./request";

export function getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem(COOKIE_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(COOKIE_KEY, sessionId);
    }
    return sessionId;
}

export const updateActivity = async (path :string, action: string, store: string) => {
    await request({
        url: AUTH_BASE_URL + '/update-activity/' + getOrCreateSessionId() + '/' + store + '/' + path + '/' + action,
        method: 'PUT',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.update-activity'
        }
    }).then(async (response) => {
       console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })
}
