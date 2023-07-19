Restaurant.destroy_all

restaurant = [
    {name: "Kevin's Bistro", 
    address: "1700 Platte St. Denver, CO 80202",
    description: "Named 'The Best Bistro in Denver' four years in a row!",
    image_url: "https://www.exchangedistrict.org/wp-content/uploads/2018/03/IMG_0249-scaled.jpg",
    id: 1
},
    {name: "Chris Ruth's Steak House",
    address: "1600 Larimer St. Denver, CO 80205",
    description: "The most popular steak house in Denver",
    image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/ff/a8/8a/join-us-at-ruth-s-chris.jpg",
    id: 2
},

    {name: "Jack's Hole in the Wall",
    address: "123 Colfax Ave. Denver, CO 80203",
    description: "Doesn't look like much, but loved by locals",
    image_url: "https://www.nj.com/resizer/UIRkHX9fBi9cOVj2b_H6Eyqln4k=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/BOFC72LKXFCURNLF7KHKB2PIKM.jpg",
    id: 3
}]

restaurant.each do |t|
    Restaurant.create(t)
end




