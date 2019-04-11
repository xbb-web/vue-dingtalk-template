<template>
  <div>
    <div @click="clickHandler">
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    content: {
      type: String,
      default: 'Error Message'
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
    }
  },
  created () {
    this.$createDialog({
      type: 'alert',
      content: this.content,
      icon: 'cubeic-alert',
      onConfirm: (e, promptValue) => {
        this.$destroy()
      }
    }).show()
  }
}
</script>

<style scoped>
</style>
