<template>
    <div :class="{ mainWith: roleName != 'common' }" style="background: #fff;">
        <adminUser v-if="userType == 'admin'" />
        <commonUser v-else />
    </div>
</template>

<script>
import adminUser from './adminUser.vue';
import commonUser from './commonUser.vue';

export default {
    name: 'userManage',
    components: {
        adminUser,
        commonUser
    },
    data() {
        return {
            roleName: sessionStorage.getItem('roleName'),
            userType: sessionStorage.getItem('roleName')
        };
    },
    created() {
        // console.log(this.$store.state)
    }
};
</script>

<style lang="less">
</style>