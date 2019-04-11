<template>
  <dir>
    <p>{{ $t('hello') }}</p>
    <p>{{ $t('message') }}</p>
  </dir>
</template>

<script>
export default {
  name: 'HelloI18n'
}
</script>

<i18n>
{
  "cn": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
