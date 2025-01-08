// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiGateway: 'https://localhost:7052/api', // Reemplaza con la URL de tu API Gateway
  apiKey: 'c268a3823090875294886d43b63ddccc', // Reemplaza con tu API Key de TMDB
  bearerToken : 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjY4YTM4MjMwOTA4NzUyOTQ4ODZkNDNiNjNkZGNjYyIsIm5iZiI6MTczNjI4ODI3Ni44OTY5OTk4LCJzdWIiOiI2NzdkYTgxNDYxYTg3Mzk1MmM3YWYxYzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZXHQLeE811JBJmDMNu4Nm6iyry6nnAkeIUH__tCWV1Y',
  apiMovies: 'https://api.themoviedb.org/3',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
