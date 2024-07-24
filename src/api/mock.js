import Mock from 'mockjs'
import homeApi1 from './mockData/home'
import homeApi2 from './mockData/Count'
import UserApi from './mockData/User'
// 拦截请求
Mock.mock('/home/getData', homeApi1.getHomeData)
Mock.mock('/home/getCountData',homeApi2.getCountData)
Mock.mock('/User/getUserData', UserApi.getUserData)
