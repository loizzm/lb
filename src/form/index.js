import React, { useState} from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import axios from 'axios';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const [resposta, setResposta] = useState(false);
  const [MelhorCanil, setMelhorCanil] = useState("");
  const [MelhorPreco, setMelhorPreco] = useState("");
 
  
  const apiCall = (data) =>{
    console.log(data)
    const url = 'http://localhost:5000/canil'
    return axios.get(url,
    {
        params : data,
    })
    .then(response => {
      setMelhorCanil(response.data['melhor canil'])
      setMelhorPreco(response.data['preco'])
      setResposta(true)
      console.log(response.data);
    })
   }

  const onSubmit = (data) => {
    var date = data['date'];
    var formattedDate = date.replace(/-/g, "/");
    data['date'] = formattedDate
    setData(data)
    apiCall(data)
  }

  return (
    <div className="wrapper">
      <div className="container" >
      <div className="formdiv1">
        <h2 className="header">
          Melhor Canil
        </h2>
        <div className="formdiv2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form">
        <label className="label1"htmlFor="number">
                Número de cachorros pequenos:
        </label>
          <input
            className="smallDog"
            placeholder="2"
            type="number"
            {...register("small",{
                required: true

            })}
          />
          {errors.small && errors.small.type === "required" && (
            <p className="errorMsg">Este campo é obrigatório.</p>
          )}
          <label className="label2" htmlFor="number">
                Número de cachorros grandes:
        </label>
          <input
            className="bigDog"
            placeholder="2"
            type="number"
            {...register("big",{
                required:true
            })}
          />
        {errors.big && errors.big.type === "required" && (
            <p className="errorMsg">Este campo é obrigatório.</p>
          )}
        <label className="label3" htmlFor="date">
            Data que os cachorros serão levados ao canil:
        </label>
          <input
            className="Date"
            placeholder="2"
            type="date"
            {...register("date",{
                required:true,
                minLength: 10
            })}
          />
          {errors.date && errors.date.type === "required" && (
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
          {resposta ? 
          <div className="response">
            O melhor Canil é {MelhorCanil} pelo preço de {MelhorPreco}
          </div>
          :
          <div>
          </div>}
        </form>
        </div>
        </div>
      </div>
    </div>
  );
}  
export default Form
