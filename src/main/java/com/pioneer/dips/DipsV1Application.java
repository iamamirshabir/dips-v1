package com.pioneer.dips;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DipsV1Application {
	

	@RequestMapping("/user")
	  public Principal user(Principal user) {
	    return user;
	  }
	
	  @GetMapping("/resource")
	  @ResponseBody
	  public Map<String, Object> home() {
	    Map<String, Object> model = new HashMap<String, Object>();
	    model.put("id", UUID.randomUUID().toString());
	    model.put("content", "Hello World");
	    return model;
	  }
	  

	  @Configuration
	  @Order(SecurityProperties.BASIC_AUTH_ORDER)
	  protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	      http
	        .httpBasic()
	      .and()
	        .authorizeRequests()
	          .antMatchers("/index.html", "/", "/dashboard", "/login").permitAll()
	          .anyRequest().authenticated()
	          .and().csrf()
	          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());;
	    }
	  }

	public static void main(String[] args) {
		SpringApplication.run(DipsV1Application.class, args);
	}

}
