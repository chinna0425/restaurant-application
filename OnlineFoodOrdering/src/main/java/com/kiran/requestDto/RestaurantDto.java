package com.kiran.requestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RestaurantDto {
    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;

    @EqualsAndHashCode.Include
    private Long id;

}
