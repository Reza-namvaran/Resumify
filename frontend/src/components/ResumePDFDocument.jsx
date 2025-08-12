import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    marginBottom: 4,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  contactItem: {
    marginRight: 15,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

export default function ResumePDFDocument({ resume }) {
  const {
    personalInfo,
    skills,
    education,
    experience,
    certificates,
    hobbies,
  } = resume;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Personal Info */}
        <View style={styles.section}>
          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              style={styles.image}
            />
          )}
          <Text style={styles.header}>{personalInfo.name || "Unnamed"}</Text>
          <Text style={styles.text}>{personalInfo.jobTitle}</Text>
          <Text style={styles.text}>{personalInfo.bio}</Text>

          <View style={styles.contactRow}>
            {personalInfo.contact.email && (
              <Text style={styles.contactItem}>Email: {personalInfo.contact.email}</Text>
            )}
            {personalInfo.contact.phone && (
              <Text style={styles.contactItem}>Phone: {personalInfo.contact.phone}</Text>
            )}
            {personalInfo.contact.github && (
              <Link
                src={personalInfo.contact.github}
                style={[styles.contactItem, styles.link]}
              >
                GitHub
              </Link>
            )}
            {personalInfo.contact.linkedin && (
              <Link
                src={personalInfo.contact.linkedin}
                style={[styles.contactItem, styles.link]}
              >
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          {skills.length === 0 ? (
            <Text>No skills listed.</Text>
          ) : (
            skills.map((s, i) => (
              <Text key={i} style={styles.listItem}>
                {s.name} {s.level ? `- ${s.level}` : ""}
              </Text>
            ))
          )}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {education.length === 0 ? (
            <Text>No education history.</Text>
          ) : (
            education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{edu.school}</Text>
                <Text>
                  {edu.major} ({edu.start} - {edu.end})
                </Text>
                <Text>{edu.description}</Text>
              </View>
            ))
          )}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Experience / Projects</Text>
          {experience.length === 0 ? (
            <Text>No experience listed.</Text>
          ) : (
            experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{exp.organization}</Text>
                <Text>
                  {exp.role} ({exp.start} - {exp.end})
                </Text>
                {exp.achievements?.map((ach, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    • {ach}
                  </Text>
                ))}
              </View>
            ))
          )}
        </View>

        {/* Certificates */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Certificates</Text>
          {certificates.length === 0 ? (
            <Text>No certificates listed.</Text>
          ) : (
            certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{cert.name}</Text>
                <Text>
                  {cert.issuer} - {cert.date}
                </Text>
                {cert.link && (
                  <Link src={cert.link} style={styles.link}>
                    View Certificate
                  </Link>
                )}
              </View>
            ))
          )}
        </View>

        {/* Hobbies */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Hobbies / Interests</Text>
          {hobbies.length === 0 ? (
            <Text>No hobbies listed.</Text>
          ) : (
            hobbies.map((h, i) => (
              <Text key={i} style={styles.listItem}>
                • {h}
              </Text>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
}
