import { useEffect, useState } from 'react'; //rcc
import axios from "axios";

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;
        const updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                setPendingApiCall(inProgress);
            }
        }
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request) => {
                // if (request.url === this.props.path) {
                //     this.setState({ pendingApiCall: true });
                // }
                //console('running request intercepter', apiPath);
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use((response) => {
                updateApiCallFor(response.url, false);
                return response;
            }, (error) => {
                updateApiCallFor(error.response.data.path, false);
                throw error;
            });
        };
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
        registerInterceptors();
        return function unmount() {
            unregisterInterceptors();
        }
    });
    return pendingApiCall;
};