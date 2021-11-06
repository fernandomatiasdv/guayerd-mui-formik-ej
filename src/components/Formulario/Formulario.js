import { Button, MenuItem, TextField } from "@material-ui/core";
import { useFormik, FormikProvider, ErrorMessage } from "formik";
import * as yup from "yup";

const Formulario = () => {
  const validaciones = yup.object({
    nombre: yup
      .string()
      .required("El campo NOMBRE es requerido")
      .max(10, "No puede tener mas de 10 caracteres"),
    edad: yup
      .number("El tipo debe ser un número")
      .required("Debes ingresar una edad")
      .min(18, "Debes ser mayor")
      .max(99, "Mucho"),
    sexo: yup
      .string()
      .required("Selecciona un sexo")
      .oneOf(["F", "M"], "Selecciona F o M"),
    email: yup.string().email("Ingresá un email válido"),
    telefono: yup
      .string()
      .matches(
        /^(\(\+[0-9]{1,3}\))?(([0-9]{8,13})|([0-9]{3,6})-([0-9]{4,7}))$/,
        "El teléfono no es válido"
      ),
  });
  //    const [nombre, setNombre] = useState("")
  const formik = useFormik({
    initialValues: {
      nombre: "Nacho",
      edad: 0,
      sexo: null,
      email: null,
      telefono: null,
    },
    validationSchema: validaciones,
    onSubmit: (values) => console.log(values),
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="nombre"
          type="text"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
        <br />
        {/*        <ErrorMessage name="nombre" />*/}
        <br />
        <TextField
          name="edad"
          type="number"
          value={formik.values.edad}
          onChange={formik.handleChange}
          error={formik.touched.edad && Boolean(formik.errors.edad)}
        />
        <br />
        <ErrorMessage style={{ color: "red" }} name="edad" />
        <br />
        <label>
          Selecciona sexo
          <TextField
            select
            name="sexo"
            onChange={formik.handleChange}
            error={formik.touched.sexo && Boolean(formik.errors.sexo)}
          >
            <MenuItem name="sexo" value="F">
              F
            </MenuItem>
            <MenuItem name="sexo" value="M">
              M
            </MenuItem>
            <MenuItem name="sexo" value="Z">
              Z
            </MenuItem>
          </TextField>
          <ErrorMessage name="sexo" />
        </label>
        <br />
        <TextField
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <br />
        <ErrorMessage name="email" />
        <br />
        <TextField
          name="telefono"
          type="text"
          placeholder="(+54)114567894"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
        />
        <br />
        <ErrorMessage name="telefono" />

        <br />
        <Button type="submit">Ejecutar</Button>
      </form>
    </FormikProvider>
  );
};

export default Formulario;
