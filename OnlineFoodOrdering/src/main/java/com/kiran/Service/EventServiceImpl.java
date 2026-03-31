package com.kiran.Service;

import com.kiran.Repository.EventJpaRepo;
import com.kiran.Repository.RestaurantJpaRepo;
import com.kiran.entity.Event;
import com.kiran.entity.Restaurant;
import com.kiran.requestDto.EventRequest;
import com.kiran.responseDto.EventResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class EventServiceImpl implements EventService {

    private final EventJpaRepo eventRepository;
    private final RestaurantJpaRepo restaurantRepository;

    public EventServiceImpl(EventJpaRepo eventRepository,
                            RestaurantJpaRepo restaurantRepository) {
        this.eventRepository = eventRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public EventResponse createEvent(EventRequest request, Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("MMMM d, yyyy hh:mm a", Locale.ENGLISH);

        LocalDateTime start = LocalDateTime.parse(request.getStartedAt(), formatter);
        LocalDateTime end = LocalDateTime.parse(request.getEndsAt(), formatter);

        Event event = new Event();
        event.setName(request.getName());
        event.setLocation(request.getLocation());
        event.setImage(request.getImage());
        event.setStartTime(start);
        event.setEndTime(end);
        event.setRestaurant(restaurant);

        restaurant.getEvents().add(event);

        restaurantRepository.save(restaurant);

        return mapToEventResponse(eventRepository.save(event));
    }

    @Override
    public List<EventResponse> getAllEvents() {
        List<Event> eventList= eventRepository.findAll();
        List<EventResponse> responses=new ArrayList<>();
        for(Event event: eventList){
            responses.add(mapToEventResponse(event));
        }
        return  responses;
    }

    @Override
    public List<EventResponse> getEventsByRestaurant(Long restaurantId) {

        List<Event> eventList= eventRepository.findByRestaurantId(restaurantId);
        List<EventResponse> responses=new ArrayList<>();
        for(Event event: eventList){
            responses.add(mapToEventResponse(event));
        }
        return  responses;
    }

    @Override
    public void deleteEvent(Long eventId, Long userId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

         if (!event.getRestaurant().getOwner().getId().equals(userId)) {
             throw new RuntimeException("Unauthorized to Delete Resources");
         }
        Restaurant restaurant = event.getRestaurant();
        restaurant.getEvents().remove(event);

        restaurantRepository.save(restaurant);

    }

    private EventResponse mapToEventResponse(Event event) {
        EventResponse res = new EventResponse();
        res.setId(event.getId());
        res.setName(event.getName());
        res.setRestaurantName(event.getRestaurant().getName());
        // res.setOwner(event.getRestaurant().getOwner().getRole().name().replace("ROLE_", ""));
        res.setLocation(event.getLocation());
        res.setImage(event.getImage());
        res.setStartTime(event.getStartTime());
        res.setEndTime(event.getEndTime());
        return res;
    }
}
