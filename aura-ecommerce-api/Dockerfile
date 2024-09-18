


FROM maven:3.8.5-openjdk-17 AS build

COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim

COPY --from=build /app/target/aura-ecommerce-api-1.0.0.jar aura-ecommerce-api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/aura-ecommerce-api.jar"]
