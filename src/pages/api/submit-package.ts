
import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { email, services, points, marketingConsent } = req.body

    // Store the package request in Supabase
    const { data, error } = await supabase
      .from("package_requests")
      .insert([
        {
          email,
          services,
          points,
          marketing_consent: marketingConsent,
          status: "pending"
        }
      ])
      .select()
      .single()

    if (error) throw error

    // Trigger email notification using Supabase Edge Function
    const { error: emailError } = await supabase.functions.invoke("send-notification", {
      body: {
        to: "vincent@vincialmedia.com",
        subject: `New Package Request from ${email}`,
        packageRequest: data
      }
    })

    if (emailError) {
      console.error("Error sending email:", emailError)
      // Don't return error to client, as the data was saved successfully
    }

    return res.status(200).json({
      success: true,
      message: "Package request submitted successfully",
      data
    })

  } catch (error) {
    console.error("Error submitting package request:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to submit package request"
    })
  }
}
