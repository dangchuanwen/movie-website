import { getExpressionArray } from "@/utils/util";
export const domWidth = {
  install(Vue) {
    Vue.directive("width", {
      inserted(el, binding, vnode) {
        const expression = binding.value;
        const cb = binding.arg;
        const data = vnode.context;
        let width = el.offsetWidth;
        let propList = getExpressionArray(expression).flat(Infinity);
        let last_obj = data;
        for (let i = 0; i < propList.length - 1; i++) {
          last_obj = last_obj[propList[i]];
        }
        last_obj[propList[propList.length - 1]] = width;
        if (cb in vnode.context) {
          vnode.context[cb]();
        }
      }
    });
  }
};
