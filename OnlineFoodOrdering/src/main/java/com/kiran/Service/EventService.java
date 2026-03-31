package com.kiran.Service;

import com.kiran.entity.Event;
import com.kiran.requestDto.EventRequest;
import com.kiran.responseDto.EventResponse;

import java.util.List;

public interface EventService {

    EventResponse createEvent(EventRequest request, Long restaurantId);

    List<EventResponse> getAllEvents();

    List<EventResponse> getEventsByRestaurant(Long restaurantId);

    void deleteEvent(Long eventId, Long userId);
}