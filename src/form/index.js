import React, { useState} from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import mqtt from 'mqtt';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
    var options = {
    username: 'batman',
    password: 'batman'
}

var client = mqtt.connect('wss://2a8f4bf2f9244ac9bc8dcc0cbb8981e5.s1.eu.hivemq.cloud:8884/mqtt',options);
 client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});
  const apiCall = (data) =>{
    client.publish(data['topic'], data['voltage']);
    
   }

  const onSubmit = (data) => {
    setData(data)
    apiCall(data)
  }

  return (
    <div className="wrapper">
      <div className="container" >
      <div className="formdiv1">
        <h2 className="header">
          Machine Health Monitoring
        </h2>
        <div className="formdiv2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form">
        <label className="label1"htmlFor="text">
                Tópico:
        </label>
          <input
            className="smallDog"
            placeholder="Insira o tópico"
            type="text"
            {...register("topic",{
                required: true

            })}
          />
          {errors.topic && errors.topic.type === "required" && (
            <p className="errorMsg">Este campo é obrigatório.</p>
          )}
          <label className="label2" htmlFor="number">
                Tensão:
        </label>
          <input
            className="bigDog"
            placeholder="2"
            type="number"
            step="0.01"
            min="0"
            {...register("voltage",{
                required:true,
                valueAsNumber: true
            })}
          />
        {errors.voltage && errors.voltage.type === "required" && (
            <p className="errorMsg">Este campo é obrigatório.</p>
          )}
          <button
            className="btn_submit"
            type='submit'
          >
            <span>
              Enviar
            </span>
          </button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
}  
export default Form
