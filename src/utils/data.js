export async function fetchData(oidJuego,oidUsuario){
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
          "oidJuego":oidJuego,
          "oidUsuario":oidUsuario
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") === -1)throw new Error('No se pudo cargar el Juego, vuelve a cargar la página');
      const result = await response.json();

      return {
        "pregunta":result.RespuestaJuego.pregunta,
        "url": result.RespuestaJuego.imagen, 
        "errores": 10,
        // "errores": result.RespuestaJuego.errores,
        "intentos": result.RespuestaJuego.intentos,
        "puntos": result.RespuestaJuego.puntos
      };
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }    
  }