export async function fetchData(oidJuego,oidUsuario){
    try {
      const response = await fetch("/api", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "oidJuego":oidJuego,
          "oidUsuario":oidUsuario
        })
      });

      if (response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") === -1)throw new Error('No se pudo cargar el Juego, vuelve a cargar la página');
      const result = await response.json();

      //con in verifico si "opcionRespuesta existe dentro del objeto result.RespuestaJuego"
      let opcionResp = "opcionRespuesta" in result.RespuestaJuego ? result.RespuestaJuego.opcionRespuesta : undefined;
      let tipoResp = "tipoRespuesta" in result.RespuestaJuego ? result.RespuestaJuego.tipoRespuesta : undefined;
      let tipoMec= "tipoMecanica" in result.RespuestaJuego ? result.RespuestaJuego.tipoMecanica : undefined;

      return {
        "pregunta": result.RespuestaJuego.pregunta,
        "url": result.RespuestaJuego.imagen,
        //"errores": 10,
        "errores": result.RespuestaJuego.errores || 10,
        "intentos": result.RespuestaJuego.intentos,
        "puntos": result.RespuestaJuego.puntos,
        "respuesta": opcionResp,
        "tipoRespuesta": tipoResp,
        "tipoMecanica": tipoMec
      };
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }    
  }
