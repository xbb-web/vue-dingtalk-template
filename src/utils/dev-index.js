/*
 * @Author: kai.yang
 * @Date: 2019-01-17 20:13:26
 * @LastEditors: kai.yang
 * @LastEditTime: 2019-02-14 10:17:39
 * @Description: 本地mock钉钉方法
 */
import store from '@/store'

export default {
  biz: {
    navigation: {
      // 设置标题
      setTitle ({ title }) {
        // 设置导航
        store.dispatch('setAppTitle', title)
      },

      // 设置左侧返回按钮
      setLeft ({ onSuccess }) {
        onSuccess()
      },

      // 设置右侧单按钮
      setRight ({ text, show = true, onSuccess }) {
        // 隐藏按钮
        if (!show) {
          store.dispatch('setRightButton', '')
          store.dispatch('setRightMenu', [])
          return
        }
        store.dispatch('setRightButton', text)
        if (text) {
          setTimeout(() => {
            let onSuccessFunc = store.getters.getHeadConfig.onSuccess
            if (onSuccessFunc) {
              document.getElementById('set-right').removeEventListener('click', onSuccessFunc)
              store.dispatch('setOnSuccess', null)
            }
            document.getElementById('set-right').addEventListener('click', onSuccess)
            store.dispatch('setOnSuccess', onSuccess)
          }, 20)
        }
      },

      // 设置右侧多按钮
      setMenu ({ items, onSuccess }) {
        // 格式化为mock组件需要的格式
        const formatItem = items.map(item => {
          return {
            content: item.text,
            id: item.id
          }
        })
        store.dispatch('setRightMenu', formatItem)

        this.setMenuCB = function (data) {
          // 反格式化
          const item = {
            text: data.content,
            id: data.id
          }
          onSuccess(item)
        }
      }
    }
  },
  device: {
    screen: {
      // 旋转设备屏幕
      rotateView () {
        console.log('开发环境不支持 dd.device.screen.rotateView 方法，请在钉钉环境中测试')
      },

      // 重置设备屏幕方向
      resetView () {
        console.log('开发环境不支持 dd.device.screen.resetView 方法，请在钉钉环境中测试')
      }
    }
  }
}
