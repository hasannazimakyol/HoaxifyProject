package com.hoaxify.ws.user;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
<<<<<<< HEAD
import com.hoaxify.ws.shared.Views;
=======
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
<<<<<<< HEAD
=======
import jakarta.persistence.Lob;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@Entity
public class User implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message="{hoaxify.constraint.username.NotNull.message}")
	@Size(min = 4, max = 255)
//	@Column(unique = true)
	@UniqueUsername
<<<<<<< HEAD
	@JsonView(Views.Base.class)
=======
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	private String username;
	
	@NotNull
	@Size(min = 4, max = 255)
<<<<<<< HEAD
	@JsonView(Views.Base.class)
=======
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	private String displayName;
	
	@NotNull
	@Size(min = 6, max = 255)
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constraint.password.Pattern.message}")
//	@JsonIgnore
<<<<<<< HEAD
	@JsonView(Views.Sensitive.class)
	private String password;
	
	@JsonView(Views.Base.class)
=======
	private String password;
	
	//@Lob char255'ten daha büyük değer alabilmesi için
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	private String image;

	@Override
	//@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	//@JsonIgnore
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	//@JsonIgnore
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	//@JsonIgnore
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	//@JsonIgnore
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
