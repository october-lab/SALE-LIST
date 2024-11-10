const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;

}

export const getStoredData = () => {
    const storedData = sessionStorage.getItem('listing-info');
    return isJsonString(storedData) ? JSON.parse(storedData) : {};
};


export const getEventIdentifierFromSessionStorage = () => {
    if (isJsonString(sessionStorage.getItem('listing-info'))) {
        const listingInfo = JSON.parse(sessionStorage.getItem('listing-info'));
        return listingInfo?.eventIdentifier || null;
    }
    return null;
}