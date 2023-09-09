import { useEffect, useState } from 'react'; //rcc
import axios from "axios";

<<<<<<< HEAD
export const useApiProgress = (apiPath) => {
=======
export const useApiProgress = (apiMethod, apiPath) => {
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;
<<<<<<< HEAD
        const updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
=======
        const updateApiCallFor = (method, url, inProgress) => {
            if (url.startsWith(apiPath) && method === apiMethod) {
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
                setPendingApiCall(inProgress);
            }
        }
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request) => {
<<<<<<< HEAD
=======
                const{ url, method} = request;
                updateApiCallFor(method, url, true);
                return request;

>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
                // if (request.url === this.props.path) {
                //     this.setState({ pendingApiCall: true });
                // }
                //console('running request intercepter', apiPath);
<<<<<<< HEAD
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use((response) => {
                updateApiCallFor(response.url, false);
                return response;
            }, (error) => {
                updateApiCallFor(error.response.data.path, false);
=======
            });

            responseInterceptor = axios.interceptors.response.use((response) => {
                const{ url, method} = response.config;
                updateApiCallFor(method, url, false);
                return response;
            }, (error) => {
                const{ url, method} = error.config;
                updateApiCallFor(method, url, false);
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
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
<<<<<<< HEAD
    });
=======
    }, [apiPath, apiMethod]);
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
    return pendingApiCall;
};