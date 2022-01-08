//se instalan los paquetes, se usará ES6 debido a problema con una dependencia, pero Babel se ocupará de la interpretación en CommonJS, se ejecuta nodemon y se importan las dependencias.
import chalk from 'chalk';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import * as fs from 'fs';
import http from 'http'
import path from 'path/posix';
//creacion del servidor, llamada axios, transformacion a string y uso de uuidv4 (reduciendo el ID a 6) y moment con el formato mes, día, año. Se imprime por console el nombre con chalk respetando los colores.
http
    .createServer((req, res) => {
        axios.get("https://randomuser.me/api/?inc=name")
            .then((data) => {
                let name = data.data.results
                let moment1=(moment().format('MMM Do YY'))
                let id = uuidv4()
                let shortid=id.slice(id.length-6)
                let name1=(`-Nombre: ${name[0].name.first} -Apellido: ${name[0].name.last} -ID:${shortid} -Timestamp: ${moment1} \n`)
                console.log(chalk.blue.bgWhite(name1))
                res.write('revisar consola para ver los usuarios registrados')
                res.end()

                const path = './usuarios.txt'
                //creacion de documento para dejar registrados todos los clientes en texto y que se vaya actualizando.
                //primero, verificar si el archivo existe. Si existe, lo actualizará. Si no, lo creará.
                try {
                    if (fs.existsSync(path)) {
                        fs.appendFile('usuarios.txt', name1, (err, data) => {
                            if (err) {
                                console.log('no se pudo actualizar')
                            } else {
                                console.log('archivo actualizado')
                            }
                        })
                    } else {
                        fs.writeFile('usuarios.txt','',(err, data) => {
                            if (err) {
                                console.log('no se pudo crear')
                            } else {
                                console.log('archivo creado')
                            }
                        })
                    }
                } catch (error) {  
                }
                
                //leer archivo por consola con las especificaciones de chalk
                  console.log(fs.readFile('usuarios.txt', 'utf-8', (err, data) => {
                     if (err) {
                         console.log('no se pudo leer')
                    } else {
                         console.log(chalk.blue.bgWhite(data))
                    }
                  }))
                
                //iterar por el objeto con lodash, devolvera la misma lista.
                let arr=[fs.readFile('usuarios.txt', 'utf-8', (err, data) => {
                    if (err) {
                        console.log('no se pudo leer')
                    } else {
                        console.log(chalk.blue.bgWhite(data))
                    }
                 })]
                _.forOwn(arr, function (value, key) {
                    console.log(value)
                })

            })
            .catch((e) => {
                console.log(e)
            });
        
}).listen(3000,()=>console.log('Server ON and working OK'))