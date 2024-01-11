<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-form :model="form" v-show="!is_registration" label-width="60px" class="login-form" v-if="!is_registration">
        <h3 class="login-title" >登录</h3>
        <el-form-item label="账号" >
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"  >
          <el-input  prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: 35px;">
          <el-button type="success" v-if="!is_registration" @click="login">登录</el-button>
          <el-button type="primary" v-if="!is_registration" @click="toggleInputs()">注册</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="ruleForm" v-show="is_registration" status-icon label-width="60px" class="login-form" :rules="rules" ref="ruleForm" >
        <h3 class = login-title >注册</h3>
        <el-form-item label="姓名" prop="rename" label-width="80px">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.re_name" placeholder="请输入姓名" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="reusername" label-width="80px">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.re_username" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="repassword" label-width="80px">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.re_password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword_2nd" label-width="80px">
          <el-input  type="password" prefix-icon="el-icon-lock" v-model="re_password_2nd" placeholder="请再次输入密码" show-password ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: 35px;">
          <el-button type="warning" @click="resetForm()">重置</el-button>
          <el-button type="success" @click="register(ruleForm)">注册
            </el-button>
          <el-button type="primary" v-show="is_registration" @click="toggleInputs()">返回</el-button>
        </el-form-item>
      </el-form>


    </el-card>
  </div>
</template>


<script>
import {passwordCheck} from '@/assets/pwdCheck';
export default {
  data() {
    var validateName = (rule, value, callback) => {
      value = this.ruleForm.re_name
      console.log(value)
      if (!value) { // 这将涵盖 '', null, undefined 等
       return callback(new Error('请输入姓名'));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatorPhone = async (rule, value, callback) => {
      console.log(this.ruleForm.re_username)
      value = this.ruleForm.re_username
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (value !== '') {
          const reg = /^1[34578]\d{9}$/;
          if (!reg.test(value)) {
            console.log(!reg.test(value))
            callback(new Error('手机号有误'));
          } else {
            try{
              const isValidPhone = await this.checkPhone(value)
              console.log(isValidPhone)
              if (!isValidPhone) {
                callback(new Error('手机号重复'));
              } else {
                callback();
              }
            }catch(error){
              console.error('检查手机号时出错：', error);
              callback(new Error('检查手机号时出错'));
            }
          }
        }
      }
    };

    var validatorPassword = (rule, value, callback) => {
      value = this.ruleForm.re_password
      console.log(value)
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (value !== '') {
          let result = passwordCheck(this.ruleForm.re_password);
          if (result !== 3) {
            callback(new Error('密码不合规'))
          }
          callback()
        }
      }
    };
    var validateRepassword = (rule, value, callback) => {
      value = this.re_password_2nd
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.re_password) {
          callback(new Error('两次输入密码不一致!'));
      }else {
        callback();
      }
    };

    return {
      form: {
        username: '',
        password: '',
      },
      ruleForm: {
        re_name: null,
        re_username: null,
        re_password: null,
      },
      re_password_2nd: '',
      rules: {
        rename: [
          {validator: validateName, trigger: 'blur',},
        ],
        reusername: [
          {validator: validatorPhone, trigger: 'blur'},
        ],
        repassword: [
          {validator: validatorPassword, trigger: 'blur'}
        ],
        repassword_2nd: [
          {validator: validateRepassword, trigger: 'blur'}
        ],
      },
      is_registration: false,

    }
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.re_name=null;
      this.ruleForm.re_username= null;
      this.ruleForm.re_password=null
      this.re_password_2nd=null;
    },

    toggleInputs() {
        this.is_registration = !this.is_registration;
        this.form.username = ''
        this.form.password = ''
        if (!this.is_registration) {
          this.resetForm()
        }
    },
    checkPhone(value){
        return this.$http.get(`/user/check-phone?username=${value}`,).then(({data})=>{
          console.log(data.code)
          if (data.code === 1) {
            return true; // If data is true, return true
          } else {
            return false; // If data is not true, return false
          }
        }).catch(error => {
          console.error('Error occurred while checking phone:', error);
          return false; // Return false in case of an error
        });
    },
    login(){
        this.$http.get('/user/login', {params: this.form}).then(({data})=>{
            if (data.code === 1) {
              //localStorage.setItem(键/变量名, 值);//存到浏览器内部
              console.log(data)
              localStorage.setItem('uid', data.uid);
              localStorage.setItem('user', data.user);
              localStorage.setItem('name', data.name);
              localStorage.setItem('status', data.status);
              this.$router.push('/index');
            } else {
              alert('用户名或密码错误');
            }
        });
    },
    register(ruleForm){
        if (true) {
          this.$http.post('/user/register', ruleForm).then(({data})=>{
            console.log(data)
            if(data.code===1){
              alert("注册成功")
              console.log(data);
              localStorage.setItem('uid', data.uid);
              localStorage.setItem('user', data.user);
              localStorage.setItem('name', data.name);
              localStorage.setItem('status', data.status);
              this.$router.push('/index');
            }else{
              alert('注册失败');
            }
          });
        } else {
          console.log('error submit!!');
          alert('信息不完整');
          return false;
        }
    },
  }
}
</script>

<style scoped>
.login-container {
  background-image: url('../../public/orange.png');
  background-size: cover;
  background-position: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 450px;

}
.login-form {
  margin-top: 40px;
}
.login-title {
  margin-top: 20px;
  font-size: 24px;
  text-align: center;
}
</style>