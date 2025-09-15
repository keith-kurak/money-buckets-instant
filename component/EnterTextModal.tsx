import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function EnterTextModal({
  visible,
  title,
  placeholder,
  initialValue = "",
  onCancel,
  onSubmit,
}: {
  visible: boolean;
  title: string;
  placeholder: string;
  initialValue?: string;
  onCancel: () => void;
  onSubmit: (value: string) => void;
}) {
  const [text, setText] = React.useState(initialValue);

  React.useEffect(() => {
    if (visible) {
      setText(initialValue);
    }
  }, [visible, initialValue]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={() => onSubmit(text)}
            >
              <Text style={[styles.buttonText, styles.submitButtonText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "white",
  },
});