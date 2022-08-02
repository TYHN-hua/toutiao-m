class Storage {
    //获取本地数据
    get(key) {
        const value = localStorage.getItem(key);

        try {
            return JSON.parse(value);

        } catch {
            return value;
        }
    }

    //存储本地数据
    set(key, value) {
        if (typeof value === 'object' && value !== null)  {
            value = JSON.stringify(value);
        } 
        localStorage.setItem(key, value);
    }

   // 删除本地数据
    remove(key) {
        localStorage.removeItem(key)
    }
}


export default new Storage()