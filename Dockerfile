# 1. OpenJDK 17 기반 이미지 사용 (빌드 용)
FROM gradle:8.4-jdk17 AS build

# 2. 작업 디렉토리
WORKDIR /poe2-proj

# 3. Gradle 캐싱을 활용하기 위해 설정 파일만 먼저 복사
COPY springboot/database/gradle/ gradle/
COPY springboot/database/build.gradle .
COPY springboot/database/settings.gradle .

# 4. Gradle 의존성 미리 다운로드 (빌드 최적화)
RUN gradle dependencies --no-daemon

# 5. 코드 복사
COPY springboot/database/. .

# 6. 프로젝트 빌드
RUN gradle build --no-daemon

# 7. OpenJDK 17 기반 이미지 사용 (jar 구동)
FROM openjdk:17-jdk-slim

# 8. 작업 디렉토리
WORKDIR /poe2

COPY --from=build /poe2-proj/build/libs/*.jar app.jar

# 9. 포트 명시
EXPOSE 6070

# 10. node 실행
ENTRYPOINT ["java", "-jar", "app.jar"]