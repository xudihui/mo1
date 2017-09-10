# motor
摩托车 cordova  开发


1: ios的企业账号的 到时候由叶俊提供账号和密码
2：需要一个给卖家一个专门文字描述的地方
3：用户名+密码+验证码
RAM地址：https://signin.aliyun.com/motortravel/login.htm
用户名：jishuguanli@motortravel
密码:Smk_app99


1：证书生成
keytool -genkey -v -keystore demo.keystore -alias demo.keystore -keyalg RSA -validity 20000

2：签名APK
jarsigner -verbose -keystore demo.keystore -signedjar platforms/android/build/outputs/apk/demo_signed.apk  platforms/android/build/outputs/apk/android-debug.apk demo.keystore

//tuy898236
