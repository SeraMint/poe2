// package com.serasome.poe2.database.global;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class MyConfigure implements WebMvcConfigurer {

// @Bean
// MyInterceptor myInterceptor() {
// return new MyInterceptor();
// }

// @Override
// public void addInterceptors(InterceptorRegistry registry) {
// registry.addInterceptor(myInterceptor()).addPathPatterns("/**") // 모든 경로에 대해
// 인터셉터 적용
// .excludePathPatterns("/index.html", "/api/**", "/resources/**",
// "/static/**");
// }
// }
