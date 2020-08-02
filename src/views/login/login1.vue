<template>
  <div class="warp">
    <Form ref="formCustom" :model="formCustom" :label-width="80" class="login">
      <FormItem label="用户名">
        <Input type="text" v-model="formCustom.userName"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="formCustom.password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      formCustom: {
        userName: "",
        password: "",
      }
    };
  },
  created(){

  },
  methods: {
    submit() {
      this.$http.post('sysUser/login', this.formCustom).then(res => {
        sessionStorage.setItem('userName', res.data.userName);  
        sessionStorage.setItem('roleName', res.data.roleName);
        sessionStorage.setItem('token', res.token);
        this.$router.push({name: "commonUser"})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>
<style lang="less">
  .warp{
    margin: auto auto;
    .login {
      width: 480px;
      margin: 0 auto;
      position:absolute; top:50%; 
      left:50%;
      transform: translate(-50%, -50%);

    }
    
  }
</style>