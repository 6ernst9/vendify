import {getProductsProps} from "../../home-widget/model/types";
import {request} from "../../../util/request";
import {ACCOUNTS_ANALYTICS_BASE_URL} from "../../../util/constants";
import {setSessionCount, setTotalSessions} from "./reducers";
import {SessionCountResponse} from "./types";

export const getSessionCount = async ({storeId, accessToken, dispatch }: getProductsProps) => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-sessions-per-hour/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const sessionCount: SessionCountResponse[] = response.data;
        const data = sessionCount.map((session) => {
            return {
                label: session.hour + ":00",
                value: session.sessionCount
            }
        });
        dispatch(setSessionCount(data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getTotalSessions = async ({storeId, accessToken, dispatch }: getProductsProps) => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-sessions-today/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setTotalSessions(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}