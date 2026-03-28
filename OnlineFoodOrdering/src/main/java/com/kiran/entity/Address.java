package com.kiran.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String streetAddress;
    private String city;
    private String stateProvince;
    private String postalCode;
    private String country;

    // for user addresses
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"addresses", "orders"})
    private User user;

    // for restaurant address (one-to-one)
    @ToString.Exclude
    @OneToOne(mappedBy = "address")
    @JsonIgnore
    private Restaurant restaurant;

}

