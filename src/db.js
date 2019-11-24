/*
 * Created by pan 2019-02-20
 */

export default {
    setData: (target, val) => {
        return target && val && localStorage.setItem(target, JSON.stringify(Object.assign({}, this.getData(target), val)));
    },

    getData: target => {
        return target && localStorage.getItem(target) && JSON.parse(localStorage.getItem(target));
    }
};
