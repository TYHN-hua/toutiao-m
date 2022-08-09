import storage from "./storage";

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
const search = "SearchHistory"

export const setToken = (value) =>storage.set(TOKEN, value)

export const getToken =() => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)


export const setSearch = (text) =>storage.set(search,text)

export const getSearch =() => storage.get(search)