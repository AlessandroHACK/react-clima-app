import { ChangeEvent, FormEvent, useState } from 'react';
import { countries } from '../../data/countries';
import styles from './Form.module.css';
import type { SearchType } from '../../types';
import Alert from '../Alert/Alert';

type FormProps ={
    fetchWeather: (search: SearchType) => Promise<void>
}


function Form({fetchWeather}:FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    // La función handleChange se encarga de manejar los cambios en los inputs del formulario.
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        // Actualiza el estado 'search' con el nuevo valor del input correspondiente.
        setSearch({
            ...search, // Copia el estado actual.
            [e.target.name]: e.target.value // Actualiza la propiedad que coincide con el nombre del input que cambió.
        })
    }

    // La función handleSubmit se encarga de manejar el evento de envío del formulario.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página).

        // Verifica si alguno de los campos del objeto 'search' está vacío.
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios') // Actualiza el estado 'alert' con el mensaje de error.
            return
        }
        // Si no hay campos vacíos, limpiar la alerta.
        setAlert('')
        //consultamos el clima
        fetchWeather(search)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>} {/* Muestra la alerta si hay un mensaje */}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    className={styles.input}
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    id="country"
                    className={styles.select}
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">--Seleccione un País--</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code} className={styles.option}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Consultar Clima" className={styles.submit} />
        </form>
    )
}

export default Form;
