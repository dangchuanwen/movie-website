export const getExpressionArray = function(expression) {
  let res = expression.split(".");
  res.forEach((item, index, arr) => {
    arr[index] = item.split("[");
    if (arr[index].length > 1) {
      arr[index][1] = arr[index][1].substr(0, arr[index][1].length - 1);
    }
  });
  return res;
};

export const listenClickATag = function(body, router) {
  body.addEventListener("click", e => {
    const path = e.path;
    for (let dom of path) {
      if (dom.tagName === "A") {
        e.preventDefault();
        const route = dom.dataset.link;
        if (!route) {
          console.log("a 标签上的 link_url 不正确，其值为", route); // eslint-disable-line
        } else {
          router.push({
            path: route
          });
        }
        break;
      }
    }
  });
};
