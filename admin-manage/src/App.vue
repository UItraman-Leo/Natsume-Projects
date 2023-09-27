<template>
  <router-view/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  cursor: url("../public/lulu.ico"), default;
  color-scheme: dark;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(246, 246, 246, 0.85);
}
</style>
