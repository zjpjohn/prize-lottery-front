import {ossPolicy} from "../api/adm-service";
import axios from "axios";

const directory        = process.env.ENV_NAME;
const PRE_EXP_INTERVAL = 60000;
//创建上传文件http实例
const ossHttp          = axios.create({
    timeout: 30000,
    withCredentials: false,
});
export default {
    computed: {
        policyInfo() {
            return this.$store.getters["oss/policy"];
        }
    },
    methods: {
        getOssPolicy() {
            ossPolicy(`mgr_${directory}`).then(data => this.$store.dispatch("oss/policy", data));
        },
        ossUpload({
                      file,
                      prefix = 'lotto/',
                      type,
                      success
                  }) {
            const suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
            if (!type) {
                const list = [
                    'jpg',
                    'png'
                ];
                if (list.indexOf(suffix) < 0) {
                    this.$message.error('仅支持jpg/png格式.');
                    return;
                }
            }
            let {
                    dir,
                    policy,
                    appId,
                    signature,
                    domain,
                    host,
                    callback
                } = this.policyInfo;

            let prefixDir  = prefix.endsWith("/") ? prefix : prefix + '/';
            const fileName = prefixDir + new Date().getTime() + '_' + Math.ceil(Math.random() * 1000000) + '.' + suffix;

            let form = new FormData();
            form.append("OSSAccessKeyId", appId);
            form.append("key", dir + fileName);
            form.append("policy", policy);
            form.append("signature", signature);
            form.append("success_action_status", 200);
            form.append("callback", callback);
            form.append("file", file);

            ossHttp.post(host, form)
                .then(res => {
                    let url = domain + "/" + dir + fileName;
                    success(url);
                }).catch(error => {
                this.$message.error('上传文件错误');
            })
        }
    },
    mounted() {
        let currentTime = new Date().getTime();
        if (!this.policyInfo || this.policyInfo.expire <= currentTime + PRE_EXP_INTERVAL) {
            this.getOssPolicy();
        }
    }

}
