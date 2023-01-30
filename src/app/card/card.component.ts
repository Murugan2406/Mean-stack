import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  producJson = [
    {
      name: 'Macbook Laptop silver',
       productId: 1,
       price: 15000,
       desciption: 'Free PSD laptop psd mockup with gradient led light',
       image: 'https://img.freepik.com/free-psd/laptop-psd-mockup-with-gradient-led-light_53876-138283.jpg?w=1800&t=st=1675090322~exp=1675090922~hmac=78420a105a1d74833de632358e02c9b8d9f980b15e747c396d6960edd6c84a45',
       rating: 2
      },
    {
    name: 'Premium footware',
   productId: 2,
   price: 2500,
   desciption: 'Fashion footware',
   image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80  ',
   rating: 3,
  },
  {
    name: 'Black DSLR Camera',
   productId: 3,
   price: 25000,
   desciption: '',
   image: 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2667&q=80',
   rating: 2,
  },
  {
    name: 'Apple Smart Watch',
   productId: 4,
   price: '35000',
   desciption: 'Apple Premium smart watch',
   image: 'https://images.unsplash.com/photo-1554116154-e733de92fe4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
   rating: 4,
  },
    {
      name: 'Red diamon perfume',
      productId: 5,
      price: 750,
      desciption: 'Mens perfume by red diamon',
      image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      rating: 2
    },

    {
      name: 'Citixan quart watch',
      productId: 6,
      price: 1750,
      desciption: 'Mens luxuary silver watch ',
      image: 'https://images.unsplash.com/photo-1610395219791-21b0353e43cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
      rating: 1
    },
    {
      name: 'Aedela headphone ',
      productId: 7,
      price: 2600,
      desciption: 'Aedela wired headphone',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      rating: 3
    },
    {
      name: 'CCC face cream',
      productId: 8,
      price: 1200,
      desciption: 'CCC Cosmetic Jar',
      image: 'https://images.unsplash.com/photo-1634449278077-820aacbf6aa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      rating: 3
    },
    {
      name: 'Puma Shoes',
      productId: 9,
      price: 3560,
      desciption: 'Puma sport shoe olive green',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
      rating: 3
    },
    {
      name: 'Apple mackbook air 2',
      productId: 10,
      price: 26000,
      desciption: 'Apple mackbook air 2 with A1 chip',
      image: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80',
      rating: 1
    },
    {
    name: 'google pixels',
    productId: 12,
    price: 11150,
    desciption: 'google pixels mobile',
    image: 'https://images.unsplash.com/photo-1666238854836-815ff6c43b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1001&q=80',
    rating: 2
  }


  ]

  constructor() { }

  ngOnInit(): void {
  }

}
