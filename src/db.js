/*
 * Created by pan 2019-02-20
 */

const db = {
    setData: (target, val) => {
        console.log(target, val);
        return target && val && localStorage.setItem(target, JSON.stringify(Object.assign({}, db.getData(target), val)));
    },

    getData: target => {
        return target && localStorage.getItem(target) && JSON.parse(localStorage.getItem(target));
    }
};

export default db;
