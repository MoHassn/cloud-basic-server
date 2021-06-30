import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";

import { Car, cars as cars_list } from "./cars";
import { cars as cars1 } from "./cars";

(async () => {
  let cars: Car[] = cars_list;

  //Create an express applicaiton
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Cloud!");
  });

  // Get a greeting to a specific person
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get("/persons/:name", (req: Request, res: Response) => {
    let { name } = req.params;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    let { name } = req.query;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as
  // an application/json body to {{host}}/persons
  app.post("/persons", async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars", (req: Request, res: Response) => {
    const { make } = req.query;
    if (!make) return res.status(200).send(cars_list);

    const filteredCars = cars_list.filter((car: Car) => car.make == make);
    return res.status(200).send(filteredCars);
  });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found

  app.get("/cars/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(typeof id);
    if (!id) return res.status(400).send("id is required");
    const car = cars_list.filter((car: Car) => car.id == +id);
    if (car && car.length === 0) return res.status(404).send("Not found!");
    return res.status(200).send(car);
  });

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars", (req: Request, res: Response) => {
    const { id, make, type, model, cost } = req.body;
    if (!id || !make || !type || !model || !cost) {
      return res
        .status(400)
        .send("id, make, type, model, and cost are required!");
    }
    // if (!id) return res.status(400).send("id is required");
    // if (!type) return res.status(400).send("type is required");
    // if (!model) return res.status(400).send("model is required");
    // if (!cost) return res.status(400).send("cost is required");
    const newCare: Car = {
      id,
      make,
      type,
      model,
      cost,
    };
    // cars_list = [null];
    cars.push(newCare);
    // console.log("cars", cars);
    // console.log("cars_list", cars_list);
    // console.log("cars1", cars1);
    return res.status(200).send(newCare);
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
