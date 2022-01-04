import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [titleEdited, setTitleEdited] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTitleEdited(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, titleEdited);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])
      
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={ () => toggleTaskDone(task.id) }
                    disabled= {isEditing}
                >
                    <View 
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { task.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        value={titleEdited}
                        onChangeText={setTitleEdited}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View  style={styles.iconsDivider}/>

                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled= {isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}}/>
                </TouchableOpacity>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
      height: 24,
      width: 1,
      backgroundColor: '#C4C4C4',
      marginHorizontal: 12
  },
  iconsContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingLeft: 12,
   paddingRight: 24
  },
  container: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  infoContainer: {
      flex: 1,
  }
})