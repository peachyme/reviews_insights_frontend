import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000' }), // Update with your API's base URL
  endpoints: (builder) => ({
    filterBusinesses: builder.mutation({
      query: (filters) => ({
        url: '/businesses/filter',
        method: 'POST',
        body: filters
      })
    }),

    // Mutation for filtering reviews
    filterReviews: builder.mutation({
      query: (filters) => ({
        url: '/reviews/filter', 
        method: 'POST',
        body: filters
      })
    }),

    // Mutation for generating a response
    generateResponse: builder.mutation({
      query: (data) => ({
        url: '/response/generate', 
        method: 'POST',
        body: data
      })
    }),

    // Fetch top-rated businesses
    getTopRatedBusinesses: builder.query({
      query: () => '/businesses/topRated'
    }),

    // Fetch most-reviewed businesses
    getMostReviewedBusinesses: builder.query({
      query: () => '/businesses/mostRated'
    }),

    // Fetch review distribution
    getReviewDistributionByRating: builder.query({
      query: () => '/businesses/reviewDestribution'
    }),

    // Fetch top 5 businesses by category
    getTop5BusinessesByCategory: builder.query({
      query: () => '/categories/top5Businesses'
    }),

    // Fetch lowest-rated categories
    getLowestRatedCategories: builder.query({
      query: () => '/categories/lowestRated'
    }),

    // Fetch highest-rated categories
    getHighestRatedCategories: builder.query({
      query: () => '/categories/highestRated'
    }),

    // Fetch all categories
    getAllCategories: builder.query({
      query: () => '/categories'
    }),

    // Fetch all businesses
    getAllBusinesses: builder.query({
      query: () => '/businesses'
    }),

    // get Category Sentiment Distribution
    getCategorySentimentDistribution: builder.query({
      query: () => '/reviews/categorySentimentDistribution'
    }),

    // get reviews Over Time
    getReviewsOverTime: builder.query({
      query: () => '/reviews/reviewsOverTime'
    }),

    // get reviews Over Time
    getOverallRatingDestribution: builder.query({
      query: () => '/overallRatingDistribution'
    })
  })
});

// Export hooks for each endpoint
export const {
  useFilterBusinessesMutation,
  useFilterReviewsMutation,
  useGenerateResponseMutation,
  useGetTopRatedBusinessesQuery,
  useGetMostReviewedBusinessesQuery,
  useGetReviewDistributionByRatingQuery,
  useGetTop5BusinessesByCategoryQuery,
  useGetLowestRatedCategoriesQuery,
  useGetHighestRatedCategoriesQuery,
  useGetAllCategoriesQuery,
  useGetAllBusinessesQuery,
  useGetCategorySentimentDistributionQuery,
  useGetReviewsOverTimeQuery,
  useGetOverallRatingDestributionQuery
} = apiSlice;
