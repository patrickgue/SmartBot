package ch.patrickguenthard.ai.persistence

import ch.patrickguenthard.ai.common.Constants
import java.io._
/**
  * Created by Patrick on 08.12.2016.
  */
object PersistenceUtil {
  def readFile():String = {
    var file:File = new File(Constants.DATA_STORAGE_DIRECTORY + Constants.DATA_STORAGE_FILE)
    if(!file.exists()) {
      file.createNewFile();
    }
    var outputString:String = ""

    var reader:BufferedReader  = new BufferedReader(new FileReader(file))

    var buffer:Int = 0

    do {
      buffer = reader.read()
      println(buffer)
      //String.parse
    } while(buffer != -1)


    null
  }
}
