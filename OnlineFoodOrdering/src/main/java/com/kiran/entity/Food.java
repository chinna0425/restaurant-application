package com.kiran.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Long price;

    @ManyToOne
    private Category foodCategory;

    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    private boolean available;

    @ManyToOne
    @JsonIgnoreProperties({"foods", "orders", "categories"})
    private Restaurant restaurant;

    private boolean isVegetarian;

    private boolean isSeasonable;

    // remember if there is handling in the frontend for handling the duplicates take the set here
    @ManyToMany
    private List<IngredientsItem> ingredients=new ArrayList<>();

    private Date creationDate;

}
