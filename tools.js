/**
 * 复制一段文本
 */
function copy (text) {
  let timeStamp = new Date().getTime();
  let id = "copyUrlInput" + timeStamp;
  let input = document.createElement('input');
  let body = document.getElementsByTagName('body')[0];
  text = text ? text.toString().replace(/&amp;/g, '&') : "";
  input.setAttribute("id", id);
  input.style.visibility = "0";
  input.setAttribute("value", text);
  body.appendChild(input);
  let copyUrlInput = document.getElementById(id);
  copyUrlInput.select();
  document.execCommand('copy', false);
  removeNode(copyUrlInput)
}
function removeNode (node) {
  if (!node) {
    return
  }
  if (node.parentNode) {
    node.parentNode.removeChild(node)
  }
}
/**
 * 生成随机颜色
 */
function getRandomColor () {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
}
/**
 * 格式化时间
 * @param {时间戳、时间格式2016-6-6} timeStr
 * @param {时间格式} fmt
 */
function formatTime (timeStr, fmt) {
  if (!timeStr) {
    return ''
  }
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  let time = {}
  if (Object.prototype.toString.call(timeStr) !== '[object Date]') {
    time = /^\d*$/.test(timeStr) ? new Date(timeStr) : parseDate(timeStr)
  } else {
    time = timeStr
  }
  let o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
/**
 * 格式化(2017-6-30 10:10:10)日期为Date对象
 * @param {时间格式} timeStr
 */
function parseDate (timeStr) {
  var normalTime = timeStr.replace(/-/g, '/')
  var normalDate = new Date(normalTime) ? new Date(normalTime) : null
  return normalDate
}
/**
 * 根据id获取name
 * @param {需要转化的id} id
 * @param {数组} array
 * @param {需要转化的key} idKey
 * @param {转化显示的key} nameKey
 */
function getNameById (id, array, idKey, nameKey) {
  idKey = idKey || 'id'
  nameKey = nameKey || 'name'
  for (let item of array) {
    if (item[idKey] === id) {
      return item[nameKey]
    }
  }
  return ''
}
/**
 * 把objB的值赋值给有相同属性的objA
 * @param {*} objA
 * @param {*} objB
 */
function setObjValue (objA, objB) {
  for (let item in objA) {
    if (objB[item]) {
      try {
        objA[item] = JSON.parse(JSON.stringify(objB[item]))
      } catch (e) {
        objA[item] = objB[item]
      }
    } else {
      objA[item] = objB[item]
    }
  }
}
/**
 * 阿拉伯数字金额转中文大写
 * @param {金额} n
 */
function numberUppercase (n) {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整'))
}
/**
 * 金额转为千分位
 * @param {数额} num
 */
function formatMoney(num) {
  if (num || num === 0) {
    return String(num).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  } else {
    return ''
  }
}
/**
 * 获取某年的某月有几天
 * @param {年} year
 * @param {月} month
 * @param {天} day
 */
function numberOfDaysInmonth (year, month, day = 1) { // 获取一个月有几天
  let dateString = `${year}/${month}/${day}`
  let date = new Date(dateString)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  return date.getDate()
}
/**
 * 深拷贝对象
 * @param {对象} obj
 */
function deepClone(obj) {
  var target = {};
  for(var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (typeof obj[key] === 'object') {
              target[key] = deepClone(obj[key]);
          } else {
              target[key] = obj[key];
          }
      }
  }
  return target;
}
