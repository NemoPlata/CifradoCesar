 //vamos a utilizar javascript ver6, a partir
 //de funciones de tipo callback y funciones anonimas

//vamos a utilizar javascript ver 6, apartir de funciones
//de tipo callback y funciones anonimas
var cesar = cesar || (function(){
    //una funcion que no tiene nombre, porque le da penita
    //funcion para la operacion del cifrado
    //texto, desp, accion
    var doStaff = function(txt, desp, action){
        //necesitamos evitar que se repitan ciclos
        var final = false;        
        //otra variable que se encargue del reemplazo de
        //la cadena original para realizar los movimientos
        //del cifrado
        var replace = (function(){
            //definir nuestro alfabeto
            var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m', 
            'n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];                                
            //voy a  retornar de mi funcion
            return function(c){
                if(!final){
                    //Logica del cifrado y descifrado del String 
                    var arraycifrado = [txt.length];                
                    var aux = 27;                                        
                    for(var i=0; i<txt.length; i++){                                                  
                        for(var j=0; j<abc.length; j++){
                            var pos = 0;
                            if(action){
                                //cifrando                            
                                if(txt.substring(i,i+1) == abc[j]){                                
                                    pos = j;
                                    pos += parseInt(desp);                                
                                    if(pos>26){                                    
                                        pos = pos - aux;                                    
                                        arraycifrado[i] = abc[pos];                                     
                                    }else{                                    
                                        arraycifrado[i] = abc[pos];                                 
                                    }                                                                
                                    break;                                                                   
                                }else if(txt.substring(i,i+1)== " "){
                                    arraycifrado[i] = " "; 
                                    break;                                                            
                                }                            
                            }else{
                                //descifrando
                                if(txt.substring(i,i+1) == abc[j]){                                
                                    pos = j;
                                    pos -= parseInt(desp);                                
                                    if(pos<0){
                                        pos = aux + pos;                                   
                                        arraycifrado[i] = abc[pos];                                     
                                    }else{
                                        arraycifrado[i] = abc[pos];                                 
                                    }                                                                    
                                    break;
                                }else if(txt.substring(i,i+1)== " "){
                                    arraycifrado[i] = " ";
                                    break;
                                } 
                            }    
                        }                
                    }                                                       
                    var txtcifrado = "";
                    for(var i=0; i<arraycifrado.length; i++){
                        txtcifrado += arraycifrado[i];                                            
                    }
                    final = true;
                    var c = txtcifrado;                                                         
                }else{
                    c = "";
                }                                      
                return c;                
            };
        })();
        //tenemos que realizar una prueba del texto que estan
        //escribiendo en el textarea para que sea
        //solo lo que yo quiero 
        var re = (/([a-zñ]{1,200})/ig);
        return String(txt).replace(re, function(match){                        
            var str = replace(match);            
            return str;
        });
    }

    //necesito saber que estoy mandando
    //cifrado o descifrado, eso viene apartir de
    //el boton que tiene una funcion code y otra deco
    return{        
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();

//voy a crear mis funciones de cifrado
function codificar(){
    if(validar(document.getElementById('cadena').value, document.getElementById('desplazamiento').value)){
        document.getElementById('resultado').innerHTML = cesar.encode(
            document.getElementById('cadena').value, document.getElementById('desplazamiento').value
        );
    }else{
        alert("No se admiten caracteres especiales.\nIngresar solo letras minúsculas en la casilla del texto a cifrar.\nIngresar solo numeros enteros del 1 al 26 en la casilla desplazamiento.")
    }    
}

function decodificar(){
    if(validar(document.getElementById('cadena').value, document.getElementById('desplazamiento').value)){
        document.getElementById('resultado').innerHTML = cesar.decode(
            document.getElementById('cadena').value, document.getElementById('desplazamiento').value
        );
    }else{
        alert("No se admiten caracteres especiales.\nIngresar solo letras minúsculas en la casilla del texto a cifrar.\nIngresar solo numeros enteros del 1 al 26 en la casilla desplazamiento.")
    } 
        
}

function validar(txt, desp){
    regex = /[a-zñ ]/sg;
    regexNum = /[0-9]/sg;    
    var lon = txt.match(regex);    
    var lonNum = desp.match(regexNum);       
    if(desp>0 && desp<27 && lon!=null){
        if(lon.length == txt.length && desp.length == lonNum.length){        
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }                
}

